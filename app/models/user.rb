# frozen_string_literal: true

class User < ApplicationRecord
  has_many :items
  has_many :orders
  has_many :ratings
end
