package com.geetion.tieba.pojo;


import java.util.Date;

/**
 * Created by xiang on 2015/6/18.
 */
public class Image {

    private Long id;
    private String path;
    private Date createTime;

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Image{" +
                "id=" + id +
                ", path='" + path + '\'' +
                ", createTime=" + createTime +
                '}';
    }
}