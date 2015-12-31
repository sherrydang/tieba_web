package com.geetion.tieba.service;

import com.geetion.tieba.pojo.Comment;
import com.geetion.tieba.utils.mybatis.PageEntity;
import com.geetion.tieba.utils.mybatis.PagingResult;

import java.util.List;

/**
 * Created by sherry on 2015/11/17.
 */
public interface CommentService {
    /**
     * 新增一条回复
     */
    public boolean insert(Comment object);

    /**
     * 删除一条回复
     */
    public boolean delete(Long id);

    /**
     * 修改回复
     */
    public boolean updateById(Comment object);

    /**
     * 根据主键查找回复
     */
    public Comment selectById(Long id);

    /**
     * 根据用户id查找回复
     */
    public List<Comment> getCommentByClient(Long id);

    /**
     * 根据帖子评论id查找回复
     */
    public List<Comment> getCommentByReplyId(Long id);

    /**
     * 分页查询回复
     */
    public PagingResult<Comment> getCommentByParams(PageEntity pageEntity);

    /**
     * 批量删除回复
     */
    public int deleteBatch(List<Long> list);
}
