class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable

  has_many :group_users
  has_many :groups, through: :group_users
end
