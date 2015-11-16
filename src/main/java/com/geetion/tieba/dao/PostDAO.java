package com.geetion.tieba.dao;

import com.geetion.tieba.dao.base.BaseDAO;
import com.geetion.tieba.pojo.Post;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by sherry on 2015/11/12.
 */
@Repository
public interface PostDAO extends BaseDAO<Post, Long> {

    public List<Post> selectByClient(@Param("userId") Long userId);

}
