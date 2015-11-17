package com.geetion.tieba.controller;

import com.geetion.tieba.pojo.Comment;
import com.geetion.tieba.utils.mybatis.PageEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by sherry on 2015/11/17.
 */
@RequestMapping("/ctrl/comment")
public interface CommentController {

    /**
     * 按参数查找评论
     */
    @RequestMapping(value = "/search", method = RequestMethod.GET)
    @ResponseBody
    Object getCommentByParms(Integer methodType, @ModelAttribute PageEntity pageEntity, Long id, Long userId, @ModelAttribute Comment object);

    /**
     * 发布新评论
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    Object addComment(@ModelAttribute Comment comment);

    /**
     * 修改评论
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    Object updateComment(@ModelAttribute Comment comment);

    /**
     * 批量删除评论
     */
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    Object deleteBatch(Long[] ids);

}
