package com.geetion.tieba.service.impl;

import com.geetion.tieba.dao.PostDAO;
import com.geetion.tieba.pojo.Post;
import com.geetion.tieba.service.PostService;
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
    public int deleteBatch(List<Long> list) {
        return postDAO.deleteBatch(list);
    }

    @Override
    public boolean updateById(Post post) {
        return postDAO.update(post)>0;
    }

    @Override
    public Post selectById(Long id) {
        return postDAO.selectPk(id);
    }

    @Override
    public List<Post> getPostByClient(Long clientId) {
//        return postDAO.selectByClient(clientId);
        return null;
    }

}
