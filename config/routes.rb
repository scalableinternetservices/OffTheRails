# frozen_string_literal: true

Rails.application.routes.draw do
  resources :order_items
  resources :items
  resources :ratings
  resources :orders
  resources :users

  post '/login', to: 'sessions#create'
  post '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  get '/current_order', to: 'orders#get_unpurchased_order'
  get '/current_order_items', to: 'order_items#get_order_item_objects'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  get '*path', to: 'site#index'
  root 'site#index'
end
