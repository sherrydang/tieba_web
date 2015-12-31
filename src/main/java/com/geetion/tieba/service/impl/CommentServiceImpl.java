package com.geetion.tieba.service.impl;

import com.geetion.tieba.dao.CommentDAO;
import com.geetion.tieba.pojo.Comment;
import com.geetion.tieba.pojo.Comment;
import com.geetion.tieba.service.CommentService;
import com.geetion.tieba.utils.mybatis.PageEntity;
import com.geetion.tieba.utils.mybatis.PagingResult;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by sherry on 2015/11/17.
 */
@Service
public class CommentServiceImpl implements CommentService {

    @Resource
    private CommentDAO commentDAO;

    @Override
    public boolean insert(Comment object) {
        try {
            commentDAO.insert(object);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean delete(Long id) {
        return commentDAO.delete(id)>0;
    }

    @Override
    public boolean updateById(Comment object) {
        return commentDAO.update(object)>0;
    }

    @Override
    public Comment selectById(Long id) {
        return commentDAO.selectPk(id);
    }

    @Override
    public List<Comment> getCommentByClient(Long userId) {
        return commentDAO.selectByClient(userId);
    }

    @Override
    public List<Comment> getCommentByReplyId(Long replyId) {
        return commentDAO.selectByReply(replyId);
    }

    @Override
    public PagingResult<Comment> getCommentByParams(PageEntity pageEntity) {
        PageHelper.startPage(pageEntity.getPage(), pageEntity.getSize());
        List<Comment> list = commentDAO.selectParam(pageEntity.getParams());
        PageInfo<Comment> pager = new PageInfo(list);
        return new PagingResult<>(pager.getPageNum(), pager.getTotal(), pager.getPages(), pager.getList());
    }

    @Override
    public int deleteBatch(List<Long> list) {
        return commentDAO.deleteBatch(list);
    }
}
