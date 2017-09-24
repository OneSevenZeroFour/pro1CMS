/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : first_project

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-09-24 16:21:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(5) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `message` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL COMMENT '已读未读状态',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '接收信息时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('00001', '在吗', '1', '2017-09-21 11:36:26');
INSERT INTO `news` VALUES ('00050', '11', '1', '2017-09-23 14:40:27');
INSERT INTO `news` VALUES ('00051', '老板', '1', '2017-09-23 14:42:52');
INSERT INTO `news` VALUES ('00052', '1111', '1', '2017-09-23 14:50:16');
INSERT INTO `news` VALUES ('00049', '111', '1', '2017-09-23 14:07:47');
