# frozen_string_literal: true

class OrderSerializer < ActiveModel::Serializer
  attributes :id, :purchased, :user_id
  has_many :order_items
end
