package com.geetion.tieba.dao;

import com.geetion.tieba.dao.base.BaseDAO;
import com.geetion.tieba.pojo.Comment;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by sherry on 2015/11/17.
 */
@Repository
public interface CommentDAO extends BaseDAO<Comment, Long> {

    public List<Comment> selectByClient(@Param("userId") Long userId);

    public List<Comment> selectByReply(@Param("replyId") Long replyId);

}
