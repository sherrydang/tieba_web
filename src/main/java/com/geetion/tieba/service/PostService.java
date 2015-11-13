package com.geetion.tieba.service;

import com.geetion.tieba.pojo.Post;

import java.util.List;

/**
 * Created by sherry on 2015/11/12.
 */
public interface PostService {
    /**
     * 增加新帖
     *
     * @param object
     * @return
     */
    public boolean insert(Post object);

    /**
     * 批量删除帖子
     */
    public int deleteBatch(List<Long> list);

    /**
     * 修改帖子
     */
    public boolean updateById(Post object);

    /**
     * 根据id查找帖子
     */
    public Post selectById(Long id);

    /**
     * 查找用户发帖
     */
    public List<Post> getPostByClient(Long clientId);

}
