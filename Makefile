VERSION=0.0.3a


docker-login:
	$(aws ecr get-login --no-include-email --region us-west-2)


docker-build:
	docker build -t pivot/trane .


docker-push: docker-build docker-login
	docker tag pivot/trane:latest 646334828698.dkr.ecr.us-west-2.amazonaws.com/pivot/trane:${VERSION}
	docker push 646334828698.dkr.ecr.us-west-2.amazonaws.com/pivot/trane:${VERSION}
	docker push 646334828698.dkr.ecr.us-west-2.amazonaws.com/pivot/trane:latest


.PHONY: docker-build docker-push
