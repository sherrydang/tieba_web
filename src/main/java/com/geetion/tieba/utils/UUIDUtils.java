package com.geetion.tieba.utils;

import org.springframework.stereotype.Component;

/**
 * Created by virgilyan on 1/13/15.
 */
@Component
public class UUIDUtils {

    public String getUUID() {
        String uuid = java.util.UUID.randomUUID().toString();
        return uuid.replace("-", "");
    }
}
