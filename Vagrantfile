Vagrant.configure("2") do |config|
  config.vm.provider "docker" do |d|
    d.build_dir = "."
    d.ports = ["8081:8081", "8080:8080"]
  end
end
