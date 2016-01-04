package com.geetion.tieba.service.impl;

import com.geetion.tieba.consts.ImageType;
import com.geetion.tieba.dao.ImageDAO;
import com.geetion.tieba.pojo.Image;
import com.geetion.tieba.service.ImageService;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by xiang on 2015/6/18.
 */
@Service
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON, proxyMode = ScopedProxyMode.INTERFACES)
public class ImageServiceImpl implements ImageService {

    @Resource
    private ImageDAO imageDAO;

    @Override
    public boolean addImage(Image image) {
        return imageDAO.insert(image) > 0;
    }


    @Override
    public Image getImageByPk(Long id) {
        return imageDAO.selectPk(id);
    }
}
