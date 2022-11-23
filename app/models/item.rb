# frozen_string_literal: true

class Item < ApplicationRecord
  belongs_to :seller, class_name: 'User', foreign_key: 'seller_id'
  has_many :ratings
  paginates_per 4
end
