package com.geetion.tieba.pojo;

import java.util.Date;
import java.util.List;

/**
 * Created by sherry on 2015/11/11.
 */
public class Post {
    private Long id;
    private String title;
    private String content;
    private Date createTime;
    private Date updateTime;
    private Short topStatus;
    private Short bestStatus;
    private Long userId;
    private Client client;
    private Short replyAmount;
    private Short postTotalVotes;
    private Short postUserVote;

    public Short getPostUserVote() {
        return postUserVote;
    }

    public void setPostUserVote(Short postUserVote) {
        this.postUserVote = postUserVote;
    }

    public Short getPostTotalVotes() {
        return postTotalVotes;
    }

    public void setPostTotalVotes(Short postTotalVotes) {
        this.postTotalVotes = postTotalVotes;
    }

    public Short getReplyAmount() {
        return replyAmount;
    }

    public void setReplyAmount(Short replyAmount) {
        this.replyAmount = replyAmount;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    private List<Reply> replyList;

    public List<Reply> getReplyList() {
        return replyList;
    }

    public void setReplyList(List<Reply> replyList) {
        this.replyList = replyList;
    }

    public Short getBestStatus() {
        return bestStatus;
    }

    public void setBestStatus(Short bestStatus) {
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

    public Short getTopStatus() {
        return topStatus;
    }

    public void setTopStatus(Short topStatus) {
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
