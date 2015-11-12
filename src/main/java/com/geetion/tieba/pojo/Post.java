package com.geetion.tieba.pojo;

import java.util.Date;

/**
 * Created by sherry on 2015/11/11.
 */
public class Post {
    private Long id;
    private String title;
    private String content;
    private Date createTime;
    private Date updateTime;
    private short topStatus;
    private short bestStatus;
    private Long userId;

    public short getBestStatus() {
        return bestStatus;
    }

    public void setBestStatus(short bestStatus) {
        this.bestStatus = bestStatus;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public short getTopStatus() {
        return topStatus;
    }

    public void setTopStatus(short topStatus) {
        this.topStatus = topStatus;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
