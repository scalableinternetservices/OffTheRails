# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true
  validates :password, presence: true
  has_many :items
  has_many :orders
  has_many :ratings
end
