package com.geetion.tieba.service;

import com.geetion.tieba.pojo.Post;

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
     * 删除帖子
     */
    public boolean delete(Post object);

    /**
     * 修改帖子
     */
    public boolean update(Post object);

    /**
     * 查找帖子
     */
    public Post search(Long id);
}
