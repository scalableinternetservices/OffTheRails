# frozen_string_literal: true

class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :order_id
  belongs_to :item, serializer: ItemNoRatingSerializer
end
