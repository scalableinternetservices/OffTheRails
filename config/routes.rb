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
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
