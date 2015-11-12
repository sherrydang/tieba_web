package com.geetion.tieba.dao;

import com.geetion.tieba.dao.base.BaseDAO;
import com.geetion.tieba.pojo.Post;
import org.springframework.stereotype.Repository;

/**
 * Created by sherry on 2015/11/12.
 */
@Repository
public interface PostDAO extends BaseDAO<Post, Long> {

}
