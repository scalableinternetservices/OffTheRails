# frozen_string_literal: true

class OrderSerializer < ActiveModel::Serializer
  attributes :id, :purchased, :user_id, :updated_at
  has_many :order_items

  def order_items
    object.order_items.includes(:item)
  end
end
