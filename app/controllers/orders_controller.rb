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
    puts "GETTING UNPURCHASED ORDER"
    puts params.inspect
    @user = User.find(params[:user_id])
    @orders = @user.orders
    puts @orders.inspect
    @orders.each do |order|
      puts order.inspect
      if order.purchased == false
        puts "UNPURCHASED ORDER EXISTING"
        @order = order
        puts @order.inspect
      end
    end
    if @order == nil
      @order = Order.new()
      @order.user_id = @user.id
      @order.purchased = "false"
      if @order.save
        puts "UNPURCHASED ORDER NEW"
        puts @order.inspect
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
    if @order.update(order_params)
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
