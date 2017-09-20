/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : first_project

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-09-20 16:29:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('15', '18814098972', 'e10adc3949ba59abbe56e057f20f883e', '2017-09-08 19:42:05');
INSERT INTO `user` VALUES ('14', '18814098923', 'e10adc3949ba59abbe56e057f20f883e', '2017-09-08 19:41:12');
INSERT INTO `user` VALUES ('13', '18814097889', '43c790abf3b5bd8f9e668cb30d63eb7c', '2017-09-08 19:40:36');
INSERT INTO `user` VALUES ('12', '18814098999', '96e79218965eb72c92a549dd5a330112', '2017-09-07 14:32:21');
INSERT INTO `user` VALUES ('11', '18814098990', '96e79218965eb72c92a549dd5a330112', '2017-09-07 14:30:56');
INSERT INTO `user` VALUES ('10', '18814098979', 'e10adc3949ba59abbe56e057f20f883e', '2017-09-07 13:58:22');
INSERT INTO `user` VALUES ('16', '18814098912', 'e10adc3949ba59abbe56e057f20f883e', '2017-09-08 21:45:00');
INSERT INTO `user` VALUES ('17', '18814098974', '827ccb0eea8a706c4c34a16891f84e7b', '2017-09-09 11:09:08');
INSERT INTO `user` VALUES ('18', '423355435435@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-09-09 11:34:00');
INSERT INTO `user` VALUES ('19', '123@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-09-09 11:40:43');
INSERT INTO `user` VALUES ('20', '1234@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-09-09 11:47:05');
INSERT INTO `user` VALUES ('21', '123123@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-09-14 20:22:45');
INSERT INTO `user` VALUES ('22', '12321@qq.com', 'e10adc3949ba59abbe56e057f20f883e', '2017-09-14 20:23:55');
INSERT INTO `user` VALUES ('23', '45435@qq.com', '96e79218965eb72c92a549dd5a330112', '2017-09-14 20:24:36');
INSERT INTO `user` VALUES ('24', '123sd@qq.com', '4297f44b13955235245b2497399d7a93', '2017-09-14 20:26:56');
INSERT INTO `user` VALUES ('25', '123hh@qq.com', '7c9c0b787d24816fe630fc8619564306', '2017-09-20 15:46:35');
INSERT INTO `user` VALUES ('26', '1111@qq.com', 'e97fc19ecbb87fca80098b470b2fee0e', '2017-09-20 16:01:37');
