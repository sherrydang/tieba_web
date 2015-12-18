package com.geetion.tieba.controller.impl;

import com.geetion.tieba.controller.PostController;
import com.geetion.tieba.controller.base.BaseWebController;
import com.geetion.tieba.enums.ResultCode;
import com.geetion.tieba.pojo.Post;
import com.geetion.tieba.service.PostService;
import com.geetion.tieba.utils.mybatis.PageEntity;
import com.geetion.tieba.utils.mybatis.PagingResult;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

/**
 * Created by sherry on 2015/11/13.
 */
@Controller
public class PostControllerImpl extends BaseWebController implements PostController{

    @Resource
    private PostService postService;

    @Override
    public Object getPostByParms(Integer methodType, @ModelAttribute PageEntity pageEntity, Long id, Long userId, @ModelAttribute Post object) {
        HashMap<String, Object> resultMap = new HashMap<>();
        if (methodType != null) {
            switch (methodType) {
                case 1:
//                    List<Post> list = postService.getPostByClient(userId);
                    List<Post> list = postService.getAllPost();
                    resultMap.put("list", list);
                    break;
                case 2:
                    Post post = null;
                    if (id != null)
                    post = postService.selectById(id);
                    resultMap.put("object", post);
                    break;
                case 3:
                    if (pageEntity != null)
                        pageEntity.setParams(pojoToMap(object));
                    PagingResult<Post> pagingForKeyword = postService.getPostByParams(pageEntity);
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
    public Object addPost(@ModelAttribute Post post) {
        if (post != null) {
//            post.setAdminId(getLoginAdmin().getId());
            boolean insertResult = postService.insert(post);
            if (insertResult) {
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, null);
            }
            return sendResult(ResultCode.CODE_500.code, ResultCode.CODE_500.msg, null);
        }
        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }

    @Override
    public Object updatePost(@ModelAttribute Post post) {
        long postId = post.getId();
        if(postId!=0){
            boolean updateResult = postService.updateById(post);
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
            Integer deleteResult = postService.deleteBatch(Arrays.asList(ids));
            if (deleteResult != null && deleteResult > 0) {
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, null);
            }
            return sendResult(ResultCode.CODE_500.code, ResultCode.CODE_500.msg, null);

        }
        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }
}
