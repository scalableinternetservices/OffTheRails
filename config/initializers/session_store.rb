# frozen_string_literal: true

if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_off-the-rails', domain: 'off-the-rails-json-api'
else
  Rails.application.config.session_store :cookie_store, key: '_off-the-rails'
end
