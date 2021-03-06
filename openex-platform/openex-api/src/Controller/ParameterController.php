<?php

namespace App\Controller;

use FOS\RestBundle\Controller\Annotations as Rest;
use OpenApi\Annotations as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class ParameterController extends AbstractController
{
    /**
     * @OA\Response(
     *    response=200,
     *    description="List parameters"
     * )
     *
     * @Rest\View(serializerGroups={"parameter"})
     * @Rest\Get("/api/parameters")
     */
    public function getParametersAction(Request $request)
    {
        return [
            "parameters_id" => "global",
            "map_tile_server" => $this->getParameter('map_tile_server'),
            "auth_local_enable" => $this->getParameter('auth_local_enable'),
            "auth_openid_enable" => $this->getParameter('auth_openid_enable'),
            "auth_kerberos_enable" => $this->getParameter('auth_kerberos_enable'),
            "auth_openid_label" => $this->getParameter('auth_openid_label')
        ];
    }
}
