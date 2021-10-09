<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use AppBundle\Services\Helpers;
use AppBundle\Services\JwtAuth;

use BackendBundle\Entity\User;

class UserController extends Controller{

	

	public function registerAction(Request $request){
		$helpers = $this->get(Helpers::class);

		$json = $request->get("json", null);
		$params = json_decode($json);

		$data = array(
			'status' => 'error',
			'code'	 => 400,
			'msg'	 => 'User not created!'	
		);

		if($json !=null){
			$createdAt = new \Datetime("now");
			$role='user';
			if(isset($params->role))
			$role = $params->role;

			$email = (isset($params->email)) ? $params->email : null;
			$name = (isset($params->name)) ? $params->name : null;
			$surname = (isset($params->surname)) ? $params->surname : null;
			$password = (isset($params->password)) ? $params->password : null;

			$emailConstraint = new Assert\Email();
			$emailConstraint->message = "This email is not valid!";
			$validate_email = $this->get("validator")->validate($email, $emailConstraint);

			if($email != null && count($validate_email)==0 && $password != null && $name != null && $surname != null){

				$user = new User();
				$user->setCreatedAt($createdAt);
				$user->setRole($role);
				$user->setEmail($email);
				$user->setName($name);
				$user->setSurname($surname);

				$pwd = hash('sha256',$password);
				$user->setPassword($pwd);

				$em = $this->getDoctrine()->getManager();
				$isset_user = $em->getRepository('BackendBundle:User')->findBy(array(
					"email" => $email
				));

				if(count($isset_user)==0){
					$em->persist($user);
					$em->flush();

					$data = array(
						'status' => 'success',
						'code'	 => 200,
						'msg'	 => 'New user created !!',
						'user' 	 => $user
					);
				}else{
					$data = array(
						'status' => 'error',
						'code'	 => 400,
						'msg'	 => 'User not created, duplicated !!'
					);
				}
			}

		}

		return $helpers->json($data);
		
	}

	public function editAction(Request $request, $id=null){
		$helpers = $this->get(Helpers::class);
		$jwt_auth = $this->get(JwtAuth::class);

		$token = $request->get("authorization",null);//this variable comes in $POST

		$authCheck = $jwt_auth->checkToken($token);

		if($authCheck){
				//entity manager
				$em = $this->getDoctrine()->getManager();

				//get the user info via token

				$json = $request->get("json", null);
				$params = json_decode($json);

				//get the user object to update
				$user = $em->getRepository('BackendBundle:User')->findOneBy(array(
					'id' => $params->id
				));

				$data = array(
					'status' => 'error',
					'code'	 => 400,
					'msg'	 => 'User not created!'	
				);

			if($json !=null){
				//$createdAt = new \Datetime("now");
				$role = 'user';
				if(isset($params->role))
			$role = $params->role;

				$email = (isset($params->email)) ? $params->email : null;
				$name = (isset($params->name)) ? $params->name : null;
				$surname = (isset($params->surname)) ? $params->surname : null;
				$password = (isset($params->password)) ? $params->password : null;

				$emailConstraint = new Assert\Email();
				$emailConstraint->message = "This email is not valid!";
				$validate_email = $this->get("validator")->validate($email, $emailConstraint);

				if($email != null && count($validate_email)==0 || $password != null || $name != null || $surname != null){

					//$user->setCreatedAt($createdAt);
					$user->setRole($role);
					$user->setEmail($email);
					$user->setName($name);
					$user->setSurname($surname);

					if($password!=null){
						$pwd=hash('sha256', $password);
						$user->setPassword($pwd);
					} 

					$isset_user = $em->getRepository('BackendBundle:User')->findBy(array(
						"email" => $email
					));

					if(count($isset_user)==0 || $params->email == $email){
						$em->persist($user);
						$em->flush();

						$data = array(
							'status' => 'success',
							'code'	 => 200,
							'msg'	 => 'New user updated !!',
							'user' 	 => $user
						);
					}else{
						$data = array(
							'status' => 'error',
							'code'	 => 400,
							'msg'	 => 'User not updated, duplicated !!'
						);
					}
				}
			}
		}else{
				$data = array(
					'status' => 'error',
					'code'	 => 400,
					'msg'	 => 'Authorization not valid!'	
				);
		}
		return $helpers->json($data);
		
	}
	public function usersAction(Request $request){
		$helpers = $this->get(Helpers::class);
		$jwt_auth = $this->get(JwtAuth::class);

		$token = $request->get("authorization",null);
		$authCheck = $jwt_auth->checkToken($token);

		if($authCheck){
			$identity = $jwt_auth->checkToken($token, true);
			
			$em = $this->getDoctrine()->getManager();
		
				$dql = "SELECT U FROM BackendBundle:User U WHERE U.id != {$identity->sub}  ORDER BY U.id DESC";
				$query = $em->createQuery($dql);
			
			$page = $request->query->getInt('page',1);
			$paginator = $this->get('knp_paginator');
			$items_per_page = 5;

			$pagination = $paginator->paginate($query, $page, $items_per_page);
			$total_items_count = $pagination->getTotalItemCount();

			$data = array(
				'status'=>'success',
				'code'	=>200,
				'total_items_count'	=> $total_items_count,
				'items_per_page' => $items_per_page,
				'total_pages' => ceil($total_items_count / $items_per_page),
				'data'=>$pagination,
			);

		}else{
			$data = array(
				'status'=>'error',
				'code'	=>400,
				'msg'	=>'Authorization not valid'
			);
		}

		return $helpers->json($data);
	}

public function userAction(Request $request, $id = null){
			$helpers = $this->get(Helpers::class);
		$jwt_auth = $this->get(JwtAuth::class);

		$token = $request->get("authorization",null);
		$authCheck = $jwt_auth->checkToken($token);

		if($authCheck){
			$identity = $jwt_auth->checkToken($token, true);

			$em = $this->getDoctrine()->getManager();
			$user = $em->getRepository('BackendBundle:User')->findOneBy(array(
				'id'=>$id
			));
			$user->setPassword('');
			$dqlRole = "SELECT t FROM BackendBundle:User t WHERE t.id= {$identity->sub} ";
			$queryRole = $em->createQuery($dqlRole);
			if($queryRole->getScalarResult()[0]['t_role'] == 'admin'){
				if($user && is_object($user) ) {
					$data = array(
						'status'=>'success',
						'code'	=>200,
						'data'	=>$user,
						'msg'	=>'Task detail'
					);
				}else{
					$data = array(
						'status'=>'error',
						'code'	=>400,
						'msg'	=>'Task not found'
					);
				}
			}else{
				if($user && is_object($user)) {
					$data = array(
						'status'=>'success',
						'code'	=>200,
						'data'	=>$user,
						'msg'	=>'Task detail'
					);
				}else{
					$data = array(
						'status'=>'error',
						'code'	=>400,
						'msg'	=>'Task not found'
					);
				}
			}
	}else{
		$data = array(
			'status'=>'error',
			'code'	=>400,
			'msg'	=>'Authorization not valid'
		);
	}
	return $helpers->json($data);
}

public function removeAction(Request $request, $id = null){
	$helpers = $this->get(Helpers::class);
	$jwt_auth = $this->get(JwtAuth::class);

	$token = $request->get("authorization",null);
	$authCheck = $jwt_auth->checkToken($token);

	if($authCheck){

		$identity = $jwt_auth->checkToken($token, true);

		$em = $this->getDoctrine()->getManager();
		$user = $em->getRepository('BackendBundle:User')->findOneBy(array(
			'id'=>$id
		));

		if($user && is_object($user)) {
			
			$em->remove($user);//delete the table register
			$em->flush();

			$data = array(
				'status'=>'success',
				'code'	=>200,
				'msg'	=>$user
			);
		}else{
			$data = array(
				'status'=>'error',
				'code'	=>400,
				'msg'	=>'User not found'
			);
		}


	}else{
		$data = array(
			'status'=>'error',
			'code'	=>400,
			'msg'	=>'Authorization not valid'
		);
	}

	return $helpers->json($data);
}
}