# frozen_string_literal: true

# Controller for Orders
class OrdersController < ApplicationController
  before_action :set_order, only: %i[show update destroy]

  # GET /orders
  def index
    @user = User.find(params[:user_id])
    @orders = @user.orders

    render json: @orders
  end

  def get_unpurchased_order
    @user = User.find(params[:user_id])
    @orders = @user.orders
    @orders.each do |order|
      next unless order.purchased == false

      @order = order
    end
    if @order.nil?
      @order = Order.new
      @order.user_id = @user.id
      @order.purchased = 'false'
      if @order.save
        render json: @order
      else
        render json: @order.errors, status: :unprocessable_entity
      end
    else
      render json: @order
    end
  end

  # GET /orders/1
  def show
    render json: @order
  end

  # POST /orders
  def create
    @order = Order.new(order_params)
    if @order.save
      render json: @order, status: :created, location: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/1
  def update
    @order.order_items.each do |order_item|
      @item = Item.find(order_item.item_id)
      return render json: @order if @item.quantity < order_item.quantity
    end

    if @order.update(order_params)
      @order.order_items.each do |order_item|
        item = Item.find(order_item.item_id)
        item.quantity = item.quantity - order_item.quantity
        item.save
      end
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /orders/1
  def destroy
    @order.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_order
    @order = Order.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def order_params
    params.require(:order).permit(:user_id, :purchased)
  end
end
