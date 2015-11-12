package com.geetion.tieba.service;


import com.geetion.tieba.pojo.Image;

/**
 * Created by xiang on 2015/6/18.
 */
public interface ImageService {

    /**
     * 添加图片
     *
     * @param image
     * @return
     */
    public boolean addImage(Image image);

    /**
     * 根据URL获取图片信息
     *
     * @param url
     * @return
     */
    public Image getByUrl(String url);

    /**
     * 根据ID获取图片信息
     *
     * @param id
     * @return
     */
    public Image getByPk(long id);
}
