package com.geetion.tieba.dao;

import com.geetion.tieba.dao.base.BaseDAO;
import com.geetion.tieba.pojo.Post;
import com.geetion.tieba.pojo.PostVote;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by sherry on 2015/11/12.
 */
@Repository
public interface PostDAO extends BaseDAO<Post, Long> {

    public List<Post> selectByClient(@Param("userId") Long userId);

    public List<Post> selectAfterLogin(@Param("userId") Long userId);

    public int updateVote(PostVote postVote);

    public int insertVote(PostVote postVote);

    public Post selectLoginPk(@Param("userId") Long userId, @Param("id") Long id);

}
