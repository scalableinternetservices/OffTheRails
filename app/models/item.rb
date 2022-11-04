# frozen_string_literal: true

class Item < ApplicationRecord
  belongs_to :user, foreign_key: 'user_id'
  has_many :reviews
end
