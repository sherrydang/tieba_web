package com.geetion.tieba.controller;

import com.geetion.tieba.pojo.Reply;
import com.geetion.tieba.utils.mybatis.PageEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by sherry on 2015/11/17.
 */
@RequestMapping("/reply")
public interface ReplyController {

    /**
     * 按参数查找回复
     */
    @RequestMapping(value = "/search", method = RequestMethod.GET)
    @ResponseBody
    Object getReplyByParms(Integer methodType, @ModelAttribute PageEntity pageEntity, Long id, Long userId, @ModelAttribute Reply object);

    /**
     * 发布新回复
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    Object addReply(@ModelAttribute Reply reply);

    /**
     * 修改回复
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    Object updateReply(@ModelAttribute Reply reply);

    /**
     * 批量删除回复
     */
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    @ResponseBody
    Object deleteBatch(Long[] ids);

}
