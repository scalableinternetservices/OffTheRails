FROM ruby:3.0.4

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
  && apt-get update && apt-get install -y nodejs yarn graphviz --no-install-recommends \
  && gem install rails

WORKDIR /app

COPY Gemfile Gemfile.lock /app/
RUN bundle install

EXPOSE 3000
CMD ["/bin/bash"]
