package com.geetion.tieba.service.impl;

import com.geetion.tieba.dao.PostDAO;
import com.geetion.tieba.pojo.Post;
import com.geetion.tieba.service.PostService;
import com.geetion.tieba.utils.mybatis.PageEntity;
import com.geetion.tieba.utils.mybatis.PagingResult;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by sherry on 2015/11/12.
 */
@Service
public class PostServiceImpl implements PostService{

    @Resource
    private PostDAO postDAO;

    @Override
    public boolean insert(Post post) {
        try {
            postDAO.insert(post);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean delete(Long id) {
        return postDAO.delete(id) > 0;
    }

    @Override
    public int deleteBatch(List<Long> list) {
        return postDAO.deleteBatch(list);
    }

    @Override
    public List<Post> getAllPostLogin(Long userId) {
        return postDAO.selectAfterLogin(userId);
    }

    @Override
    public boolean updateById(Post post) {
        return postDAO.update(post)>0;
    }

    @Override
    public List<Post> getAllPost() {
        return postDAO.select();
    }

    @Override
    public Post selectById(Long id) {
        return postDAO.selectPk(id);
    }

    @Override
    public List<Post> getPostByClient(Long userId) {
        return postDAO.selectByClient(userId);
    }

    @Override
    public PagingResult<Post> getPostByParams(PageEntity pageEntity) {
        PageHelper.startPage(pageEntity.getPage(), pageEntity.getSize());
        List<Post> list = postDAO.selectParam(pageEntity.getParams());
        PageInfo<Post> pager = new PageInfo(list);
        return new PagingResult<>(pager.getPageNum(), pager.getTotal(), pager.getPages(), pager.getList());
    }


}
