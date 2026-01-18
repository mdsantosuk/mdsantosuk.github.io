<?php
// Get honeypot value
if (!empty($_POST['website'])) {
    // Bot submission! Ignore or log if needed
    exit('Spam detected.');
}

// Your email
$to = "YOUR-EMAIL@domain.com"; // <--- PUT YOUR EMAIL HERE
$subject = "Mensagem do site - Nigel Uniformes";

// Collect posted values, sanitize
$name = htmlspecialchars($_POST['contactName'] ?? '');
$email = htmlspecialchars($_POST['contactEmail'] ?? '');
$message = htmlspecialchars($_POST['message'] ?? '');
$topic = htmlspecialchars($_POST['subject'] ?? '');

// Prepare email body
$body = "Nome: $name\nEmail: $email\nAssunto: $topic\nMensagem:\n$message";

// Prepare headers
$headers = "From: $name <$email>" . "\r\n" .
           "Reply-To: $email" . "\r\n";

// Send email
if (mail($to, $subject, $body, $headers)) {
    echo "Mensagem enviada com sucesso!";
} else {
    echo "Erro ao enviar mensagem. Tente novamente mais tarde.";
}
?>
