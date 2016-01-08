package com.geetion.tieba.controller;

import com.geetion.tieba.pojo.Post;
import com.geetion.tieba.pojo.PostVote;
import com.geetion.tieba.utils.mybatis.PageEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by sherry on 2015/11/13.
 */
@RequestMapping("/post")
public interface PostController {

    /**
     * 按参数查找帖子
     */
    @RequestMapping(value = "/search", method = RequestMethod.GET)
    @ResponseBody
    Object getPostByParms(Integer methodType, @ModelAttribute PageEntity pageEntity, Long id, Long userId, @ModelAttribute Post object);

    /**
     * 发布帖子
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    Object addPost(@ModelAttribute Post post);

    /**
     * 修改帖子
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    Object updatePost(@ModelAttribute Post post);

    /**
     * 发布用户帖子点赞
     */
    @RequestMapping(value = "/insertVote", method = RequestMethod.POST)
    @ResponseBody
    Object insertVote(@ModelAttribute PostVote postVote);

    /**
     * 修改用户帖子点赞
     */
    @RequestMapping(value = "/updateVote", method = RequestMethod.POST)
    @ResponseBody
    Object updateVote(@ModelAttribute PostVote postVote);

    /**
     * 批量删除帖子
     */
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    Object deleteBatch(Long[] ids);
}
