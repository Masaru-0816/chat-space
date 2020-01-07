# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false|
### Association
- has_many :groups, through: :groups_users
- has_many :groups_users
- has_many :posts


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, unique: true|
### Association
- has_many :users, through: :groups_users
- has_many :groups_users
- has_many :posts


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user
- has_many :posts


## postsテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|foreign_key: true|
|image|text|foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
- belongs_to :group_user


* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
