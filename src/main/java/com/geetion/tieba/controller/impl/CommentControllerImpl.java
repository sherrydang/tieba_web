package com.geetion.tieba.controller.impl;

import com.geetion.tieba.controller.CommentController;
import com.geetion.tieba.controller.base.BaseWebController;
import com.geetion.tieba.enums.ResultCode;
import com.geetion.tieba.pojo.Comment;
import com.geetion.tieba.service.CommentService;
import com.geetion.tieba.service.CommentService;
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
public class CommentControllerImpl extends BaseWebController implements CommentController {

    @Resource
    CommentService commentService;

    @Override
    public Object getCommentByParms(Integer methodType, @ModelAttribute PageEntity pageEntity, Long id, Long userId, Long replyId, @ModelAttribute Comment object) {
        HashMap<String, Object> resultMap = new HashMap<>();
        if (methodType != null) {
            switch (methodType) {
                case 1:
                    List<Comment> list = commentService.getCommentByClient(userId);
                    resultMap.put("commentList", list);
                    break;
                case 2:
                    Comment comment = null;
                    if (id != null)
                        comment = commentService.selectById(id);
                    resultMap.put("commentList", comment);
                    break;
                case 3:
                    if (pageEntity != null)
                        pageEntity.setParams(pojoToMap(object));
                    PagingResult<Comment> pagingForKeyword = commentService.getCommentByParams(pageEntity);
                    resultMap.put("commentList", pagingForKeyword.getResultList());
                    resultMap.put("totalPage", pagingForKeyword.getTotalPage());
                    resultMap.put("totalSize", pagingForKeyword.getTotalSize());
                    resultMap.put("currentPage", pagingForKeyword.getCurrentPage());
                    break;
                case 4:
                    List<Comment> commentList = commentService.getCommentByReplyId(replyId);
                    resultMap.put("commentList", commentList);
                    break;
            }
            return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, resultMap);
        }

        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }

    @Override
    public Object addComment(@ModelAttribute Comment comment) {
        if (comment != null) {
//            comment.setAdminId(getLoginAdmin().getId());
            boolean insertResult = commentService.insert(comment);
            if (insertResult) {
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, null);
            }
            return sendResult(ResultCode.CODE_500.code, ResultCode.CODE_500.msg, null);
        }
        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }

    @Override
    public Object updateComment(@ModelAttribute Comment comment) {
        long commentId = comment.getId();
        if(commentId!=0){
            boolean updateResult = commentService.updateById(comment);
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
            Integer deleteResult = commentService.deleteBatch(Arrays.asList(ids));
            if (deleteResult != null && deleteResult > 0) {
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, null);
            }
            return sendResult(ResultCode.CODE_500.code, ResultCode.CODE_500.msg, null);

        }
        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }
}
