package com.geetion.tieba.controller.impl;

import com.geetion.tieba.controller.ReplyController;
import com.geetion.tieba.controller.base.BaseWebController;
import com.geetion.tieba.enums.ResultCode;
import com.geetion.tieba.pojo.Reply;
import com.geetion.tieba.service.ReplyService;
import com.geetion.tieba.utils.mybatis.PageEntity;
import com.geetion.tieba.utils.mybatis.PagingResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

/**
 * Created by sherry on 2015/11/17.
 */
@Controller
public class ReplyControllerImpl extends BaseWebController implements ReplyController {

    @Resource
    ReplyService replyService;

    @Override
    public Object getReplyByParms(Integer methodType, @ModelAttribute PageEntity pageEntity, Long id, Long userId, @ModelAttribute Reply object) {
        HashMap<String, Object> resultMap = new HashMap<>();
        if (methodType != null) {
            switch (methodType) {
                case 1:
                    List<Reply> list = replyService.getReplyByClient(userId);
                    resultMap.put("list", list);
                    break;
                case 2:
                    Reply reply = null;
                    if (id != null)
                        reply = replyService.selectById(id);
                    resultMap.put("list", reply);
                    break;
                case 3:
                    if (pageEntity != null)
                        pageEntity.setParams(pojoToMap(object));
                    PagingResult<Reply> pagingForKeyword = replyService.getReplyByParams(pageEntity);
                    resultMap.put("list", pagingForKeyword.getResultList());
                    resultMap.put("totalPage", pagingForKeyword.getTotalPage());
                    resultMap.put("totalSize", pagingForKeyword.getTotalSize());
                    resultMap.put("currentPage", pagingForKeyword.getCurrentPage());
                    break;
            }
            return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, resultMap);
        }

        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }

    @Override
    public Object addReply(@ModelAttribute Reply reply) {
        if (reply != null) {
//            reply.setAdminId(getLoginAdmin().getId());
            boolean insertResult = replyService.insert(reply);
            if (insertResult) {
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, null);
            }
            return sendResult(ResultCode.CODE_500.code, ResultCode.CODE_500.msg, null);
        }
        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }

    @Override
    public Object updateReply(@ModelAttribute Reply reply) {
        long replyId = reply.getId();
        if(replyId!=0){
            boolean updateResult = replyService.updateById(reply);
            if (updateResult) {
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, null);
            }
            return sendResult(ResultCode.CODE_500.code, ResultCode.CODE_500.msg, null);
        }
        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }

    @Override
    public Object deleteBatch(Long[] ids) {
        if (checkParaNULL(ids)) {
            Integer deleteResult = replyService.deleteBatch(Arrays.asList(ids));
            if (deleteResult != null && deleteResult > 0) {
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, null);
            }
            return sendResult(ResultCode.CODE_500.code, ResultCode.CODE_500.msg, null);

        }
        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }
}
