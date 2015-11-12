package com.geetion.tieba.dao;

import com.geetion.tieba.dao.base.BaseDAO;
import com.geetion.tieba.pojo.Image;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by xiang on 2015/6/18.
 */
@Repository
public interface ImageDAO extends BaseDAO<Image, Long> {

    public Image selectByUrl(@Param("url") String url);
}
