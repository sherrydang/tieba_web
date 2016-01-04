package com.geetion.tieba.pojo;

import java.util.Date;

/**
 * Created by sherry on 2015/11/11.
 */
public class Reply {
    private Long id;
    private String content;
    private Date createTime;
    private Date updateTime;
    private Long postId;
    private Long userId;
    private Short commentAmount;
    private Client client;

    public Short getCommentAmount() {
        return commentAmount;
    }

    public void setCommentAmount(Short commentAmount) {
        this.commentAmount = commentAmount;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
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

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
