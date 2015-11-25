from pyramid.view import view_config

USERS = []

@view_config(route_name='home', renderer='myproject:index.pt')
def my_view(request):
    return {'project': 'MyProject'}

@view_config(route_name='register', renderer='json')
def my_register(request):
    data = (request.json_body)
    for user in data.values():
        if not USERS:
            USERS.append(user)
        else:
            check_user_exist = True
            for reg_user in USERS:
                if reg_user['name']==user['name']:
                    check_user_exist = False

            if check_user_exist:
                USERS.append(user)
    return {'users': USERS}

@view_config(route_name='login', renderer='json', request_method='GET')
def my_login(request):
	return {'users': USERS}