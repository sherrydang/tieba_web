package com.geetion.tieba.service.impl;

import com.geetion.tieba.dao.ImageDAO;
import com.geetion.tieba.pojo.Image;
import com.geetion.tieba.service.ImageService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * Created by xiang on 2015/6/18.
 */
@Service
public class ImageServiceImpl implements ImageService {

    @Resource
    private ImageDAO imageDAO;

    @Override
    public boolean addImage(Image image) {
        return imageDAO.insert(image) > 0;
    }

    @Override
    public Image getByUrl(String url) {
        return imageDAO.selectByUrl(url);
    }

    @Override
    public Image getByPk(long id) {
        return imageDAO.selectPk(id);
    }
}
