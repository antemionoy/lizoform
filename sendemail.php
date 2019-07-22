<?php
	
	$mail_to        = "rentparnas@gmail.com";
	// $mail_to        = "anton.z@bananaweb.ru";
	$mail_from		= 'robot@biznesarenda.ru';
	$site_title		= 'Бизнесаренда.рф';
	$subject		= 'Форма';
	
	$file_dir_upload    = 'callback/';
	$file_flag 			= true;
	$file_blacklist  	= array(".php", ".phtml", ".php3", ".php4", ".html", ".htm");
	
	$name = htmlspecialchars($_POST["username"]);
	$surname = htmlspecialchars($_POST["surname"]);
	$message = htmlspecialchars($_POST["message"]);

	$phone = htmlspecialchars($_POST["phone"]);
	$email = htmlspecialchars($_POST["email"]);


	if($name)
		$name = "<p><strong>Имя:</strong> ".$name."</p>";
	else $name = "";


	if($surname)
		$surname = "<p><strong>Фамилия:</strong> ".$surname."</p>";
	else $surname = "";

	if($email)
		$email = "<p><strong>Почта:</strong> ".$email."</p>";
	else $email = "";


	if($message)
		$message = "<p><strong>Cообщение:</strong> ".$message."</p>";
	else $message = "";

	if($phone)
		$phone = "<p><strong>Телефон:</strong> ".$phone."</p>";
	else $phone = "";

	$message = $name.$surname.$phone.$email.$message.$reviewStars.$choice__discount.$date__arrival.$date__departure.$number__persons.$checkbox;
	
	if($budjet_ot || $budjet_do) {
		if(!$budjet_ot)
			$budjet_ot = "";
		else $budjet_ot = "от ".$budjet_ot." ";
		if(!$budjet_do)
			$budjet_do = "";
		else $budjet_do = "до ".$budjet_do." ";
		$budjet = "<p><strong>Бюджет:</strong> ".$budjet_ot.$budjet_do."</p>";
	}
	else $budjet = "";
	$message = $title.$name.$phone.$email.$uslugi.$site.$ms.$budjet.$url;

	
	if ($_FILES['file']['tmp_name']) {
		foreach ($blacklist as $item)
		if(preg_match("/$item\$/i", $_FILES['file']['name'])) {
			$file_flag = false; 
			break;
		};
	}
	else $file_flag = false; 

	if($file_flag) {
		$file_dir_upload = $file_dir_upload.$_FILES['file']['name'];

		if (file_exists($file_dir_upload)) {
			unlink($file_dir_upload);
		}

		if(!copy($_FILES['file']['tmp_name'], $file_dir_upload)) {
			$file_flag = false;
		}
	}
	
	$mail_subject = "Заявка с сайта «".$site_title."»";
	
	if($file_flag) {
		if($phone != "") {
			if(sendFile($mail_to,$mail_from,$mail_subject,$message,$file_dir_upload,$_FILES['file']['name'])){
				echo 'ok';
			}
		}
	}
	else {
		$EOL = "\r\n";
		$mail_headers  = "MIME-Version: 1.0;$EOL";
		$mail_headers .= "Content-type: text/html; charset=utf-8$EOL";
		$mail_headers .= "From: ".$mail_from." $EOL";
	
		if($phone != "") {
			if(mail($mail_to, $mail_subject, $message, $mail_headers)){
				echo 'ok';
			}	
		}
	}
	
	
	function sendFile($to,$from,$subject,$message,$filedir,$filename) {
		$boundary = "---"; //Разделитель
		/* Заголовки */
		$headers = "From: $from\nReply-To: $from\n";
		$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"";
		$body = "--$boundary\n";
		/* Присоединяем текстовое сообщение */
		$body .= "Content-type: text/html; charset='utf-8' \n";
		$body .= "Content-Transfer-Encoding: quoted-printable";
		$body .= "Content-Disposition: attachment; filename==?utf-8?B?".base64_encode($filedir)."?=\n\n";
		$body .= $message."\n";
		$body .= "--$boundary\n";
		$file = fopen($filedir, "r"); //Открываем файл
		$text = fread($file, filesize($filedir)); //Считываем весь файл
		fclose($file); //Закрываем файл
		/* Добавляем тип содержимого, кодируем текст файла и добавляем в тело письма */
		$body .= "Content-Type: application/octet-stream; name==?utf-8?B?".base64_encode($filename)."?=\n";
		$body .= "Content-Transfer-Encoding: base64\n";
		$body .= "Content-Disposition: attachment; filename==?utf-8?B?".base64_encode($filename)."?=\n\n";
		$body .= chunk_split(base64_encode($text))."\n";
		$body .= "--".$boundary ."--\n";

		return mail($to, $subject, $body, $headers);
	}
	
?>