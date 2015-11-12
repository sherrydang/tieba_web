package com.geetion.tieba.utils;


import com.geetion.tieba.consts.ImageField;

import java.util.HashMap;
import java.util.Map;

/**
 * ����ת����
 *
 * @author rex
 *
 */
public class QueryUtil {

	/**
	 * ��{"", "", ""}ת��Ϊ��Ҫ��map
	 * 
	 * @param querys
	 * @return
	 */
	public static Map<String, String> query2Map(String[] querys) {
		Map<String, String> map = new HashMap<String, String>();
		if (null != querys && querys.length > 0) {
			map.put(ImageField.MAP_FIELD, querys[0]);
		}

		for (int i = 1, len = querys.length; i < len; i += 2) {
			if (len >= (i + 2)) {
				map.put(querys[i], querys[i + 1]);
			}
		}
		return map;
	}

}
