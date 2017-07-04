Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "games#index"
  post "/games-data", to: "games#create"

end
