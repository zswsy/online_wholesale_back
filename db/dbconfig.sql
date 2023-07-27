create schema `online_wholesale`;

------------------
--创建商品表
------------------
CREATE TABLE `online_wholesale`.`PRODUCTS` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) DEFAULT NULL,
  `product_description` varchar(255) DEFAULT NULL,
  `product_price` decimal(10,2) DEFAULT NULL,
  `product_quantity` int DEFAULT NULL,
  PRIMARY KEY (`product_id`)
);

------------------
--创建订单表
------------------
CREATE TABLE `online_wholesale`.`ORDERS` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `quantity_ordered` int DEFAULT NULL,
  `order_price` int null default 0 comment '订单总金额',
  `receive_adress` varchar(45) null,
  `contact_phone` varchar(45) null,
  `order_status` varchar(45) null comment '订单状态',
  `process_id` varchar(45) null comment '处理订单人员编号',
  `order_carrier` varchar(45) null comment '运输承担商名称',
  `track_num` varchar(45) null comment '物流订单编号',
  PRIMARY KEY (`order_id`)
);


------------------
--创建用户表
------------------
CREATE TABLE `online_wholesale`.`USERS` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
);

------------------
--创建促销表
------------------
CREATE TABLE `online_wholesale`.`PROMOTIONS` (
  `promotion_id` int NOT NULL AUTO_INCREMENT,
  `promotion_name` varchar(255) DEFAULT NULL,
  `promotion_type` varchar(255) DEFAULT NULL,
  `promotion_startdate` datetime DEFAULT NULL,
  `promotion_enddate` datetime DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `discount_rate` decimal(4,2) DEFAULT NULL,
  `full_amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`promotion_id`)
);

------------------
--创建统计表
------------------
CREATE TABLE `online_wholesale`.`STATISTICS` (
  `stat_id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `visits` int DEFAULT NULL,
  `gross_sales` decimal(10,2) DEFAULT NULL,
  `orders_count` int DEFAULT NULL,
  `customer_retention_rate` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`stat_id`)
);

------------------
--创建物流表
------------------
CREATE TABLE `online_wholesale`.`track` (
 `track_id` int unique auto_increment,
 `track_carrier` varchar(45) null,
 `track_carrier_id` varchar(45) unique null,
 `track_current_position` varchar(255) null,
 `track_update_time` varchar(45) null,
 primary key (`track_id`)
);


-----作废
------------------
--创建导航栏表
------------------

CREATE TABLE `online_wholesale`.`menu` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '菜单栏id',
  `path` VARCHAR(45) NULL COMMENT '导航栏的路径',
  `name` VARCHAR(45) NOT NULL COMMENT '组件名称',
  `label` VARCHAR(45) NOT NULL COMMENT '组件名称',
  `icon` VARCHAR(45) NULL COMMENT '一级导航栏图标',
  `url` VARCHAR(45) NULL COMMENT '组件文件名',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
COMMENT = '后台导航栏';

