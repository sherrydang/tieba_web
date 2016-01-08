package com.geetion.tieba.pojo;

/**
 * Created by sherry on 2016/1/8.
 */
public class PostVote {
    private Long userId;
    private Long postId;
    private Long vote;

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getVote() {
        return vote;
    }

    public void setVote(Long vote) {
        this.vote = vote;
    }
}
