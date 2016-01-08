package com.geetion.tieba.service;

import com.geetion.tieba.pojo.Post;
import com.geetion.tieba.pojo.PostVote;
import com.geetion.tieba.utils.mybatis.PageEntity;
import com.geetion.tieba.utils.mybatis.PagingResult;

import java.util.List;

/**
 * Created by sherry on 2015/11/12.
 */
public interface PostService {
    /**
     * 新增一条帖子
     */
    public boolean insert(Post object);

    /**
     * 删除一条帖子
     */
    public boolean delete(Long id);

    /**
     * 修改帖子
     */
    public boolean updateById(Post object);

    /**
     * 修改帖子点赞
     */
    public boolean updateVote(PostVote postVote);


    /**
     * 新建帖子点赞
     */
    public boolean insertVote(PostVote postVote);

    /**
     * 查询所有帖子
     */
    public List<Post> getAllPost();


    /**
     * 根据主键查找帖子
     */
    public Post selectById(Long id);

    /**
     * 根据用户id查找帖子
     */
    public List<Post> getPostByClient(Long userId);

    /**
     * 分页查询帖子
     */
    public PagingResult<Post> getPostByParams(PageEntity pageEntity);

    /**
     * 批量删除帖子
     */
    public int deleteBatch(List<Long> list);

    /**
     * 登录后帖子首页（包含点赞）
     */
    public List<Post> getAllPostLogin(Long userId);

}
